<template>
  <div class="schedule-box">
    <div>资源排程</div>
    <div class="search-box">
      <el-date-picker
        v-model="timeRange"
        type="daterange"
        value-format="yyyy/MM/dd"
        @change="dateChange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>
      <el-button type="primary">搜索</el-button>
    </div>
    <div class="schedule-content">
      <div class="schedule-table">
        <table width="100%" border="1" style="border-collapse: collapse">
          <tr>
            <th width="20%">人员</th>
            <th v-for="(item, index) in dateArr" :key="index">{{ item.slice(5) }}</th>
            <!-- <th width="40%">日期</th> -->
          </tr>
          <tr v-for="(item, index) in scheduleList" :key="item.id">
            <td>
              <div class="user-info">
                <div class="img-box">
                  <img class="img" :src="item.image" alt="" />
                </div>
                <div class="basic-box">
                  <h4 class="user-name">{{ item.name }}</h4>
                  <div class="time-box">
                    <span>{{ item.time }} <i class="el-icon-time"></i></span>
                    <span>{{ item.percent }} %</span>
                  </div>
                </div>
              </div>
            </td>
            <template v-for="(dateItem, ind) in dateArr">
              <td :id="'target' + index + ind" :data-rowindex="index" :data-colindex ="ind" :data-colspan="item.info[ind].colNum" 
                v-if='item.info.length > 0 && item.info[ind].colNum && ind == item.info[ind].colIndex-1' :key="ind" :colspan="item.info[ind].colNum">
                <div>{{item.info[ind].title}}</div>
              </td>
              <td :id="'target' + index + ind" :data-rowindex="index" :data-colindex ="ind" 
                v-if='!item.info.length > 0 || !item.info[ind].isCol' :key="ind">
                  <div>教育2{{item.info.length > 0 ? item.info[ind].isCol : 'false'}}</div>
                </td>
            </template>
          </tr>
        </table>
      </div>
      <div class="project-list">
        <div class="project-title">项目清单</div>
        <ul>
          <li
            class="project-box"
            v-for="(item, index) in projectList"
            :key="item.id"
            :data-value="JSON.stringify(item)"
            :id="'draggable' + index"
          >
            <div class="manage-name">{{ item.name }}</div>
            <div>
              <span>{{ item.title.slice(0, 15) }}</span>
              <span>({{ item.start }} ~ {{ item.end }})</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import "../../mock/index.js";
import $ from "jquery";
import "../../../static/jquery-ui.js";
import FN from "../../util/date.js";
export default {
  name: "ScheduleJqueryMore",
  data() {
    return {
      scheduleList: [],
      projectList: [],
      timeRange: "",
      dateArr: [],
    };
  },
  mounted() {
    // 列表数据
    this.getSchedule();
    // 项目数据
    this.getProject();
    setTimeout(() => {
      this.initDrag();
    }, 100);
  },
  methods: {
    /** 获取列表数据 */
    getSchedule() {
      this.$axios.post("/getScheduleList").then((res) => {
        // console.log(res);
        if (res.status == 200) {
          this.scheduleList = res.data.scheduleList;
        }
      });
    },
    /**获取项目数据 */
    getProject() {
      this.$axios.post("/getProjectList").then((res) => {
        // console.log(res);
        if (res.status == 200) {
          this.projectList = res.data.projectList;
        }
      });
    },
    /** 日期查询 */
    dateChange() {
      if(this.timeRange) {
        this.dateArr = FN.getAllDate(this.timeRange[0], this.timeRange[1]);
      }
      this.getSchedule();
      setTimeout(() => {
        this.initDrag();
      }, 100);
    },
    /** 初始化拖拽 */
    initDrag() {
      let that = this;
      //拖拽复制体
      $('li[id^="draggable"]').draggable({
        helper: "clone",
        cursor: "move",
      });

      //释放后
      $('td[id^="target"]').droppable({
        hoverClass: "droppable-active",
        addClasses: true,
        drop: function (event, ui) {
          var $td = $(this).parent().find('td')[1];
          // $($td).children().remove();
          var data = JSON.parse(ui.draggable[0].dataset.value);
          var source = `<div class='box-move'>
                          <span>${data.title}</span>
                          <i class='el-icon-delete img' style='display:none;'></i>
                        </div>`
          // $($td).append(source);
          $($td).find(".box-move").mouseenter(function () {
              $(this).find(".img").show();
            });

          $($td).find(".box-move").mouseleave(function () {
              $(this).find(".img").hide();
            });

          $($td).find(".img").click(function () {
            $(this).parent(".box-move").remove();
          });
          
         

          // 获取行的索引
          var rowIndex = Number(event.target.dataset.rowindex);
          // 获取列的索引(加1)
          var colIndex = Number(event.target.dataset.colindex)+1;
          // 是否有合并的td
          if(Number(event.target.dataset.colspan) > colIndex){
              colIndex = Number(event.target.dataset.colspan);
          }
          // 记录最后一列列索引值
          var lastColIndex = that.scheduleList[rowIndex].lastColIndex;
          that.scheduleList[rowIndex].lastColIndex = colIndex;

          // 记录行数
          var lastRowIndex = that.scheduleList[rowIndex].lastRowIndex;
          that.scheduleList[rowIndex].lastRowIndex = rowIndex;

          
          // 获取列表头对应的日期
          var endDate = that.dateArr[colIndex -1];
          // 查询的开始日期
          var searchStartDate = that.timeRange[0];
          // 项目的开始日期
          var projectStartDate = data.start;
          // 日期起始的索引
          // var startDateIndex = that.dateArr.indexOf(projectStartDate) > 0 ? that.dateArr.indexOf(projectStartDate) : 1;
          var newArr = [];
          var arr = that.scheduleList[rowIndex].colInfo;
          var num = that.scheduleList[rowIndex].num;
          that.scheduleList[rowIndex].num += 1;
          arr.push({colIndex: num==1? 1 : lastColIndex+1, colNum: num==1 ? colIndex-lastColIndex +1 : colIndex-lastColIndex, title: data.title});
          // 生成日期索引对应的数据
          newArr = that.dateArr.map( (v, i) => {
            return {colIndex: i +1, colNum: 0,isCol: false, title: ''};
          });
          // 合并数据新增标识
          for (var i = 0; i < arr.length; i++) {
              var col = arr[i].colNum;
              var sum = 0;
              var index = -1;
              for (var j = 0; j < newArr.length; j++) {
                  if (arr[i].colIndex == newArr[j].colIndex) {
                      newArr[j].colNum = arr[i].colNum;
                      newArr[j].isCol = true;
                      newArr[j].title = arr[i].title;
                      sum++;
                      index = j;
                  } else {
                      if (index > -1) {
                          if (arr[i].colIndex == newArr[index].colIndex && sum < col) {
                              newArr[j].isCol = true;
                               newArr[j].title = arr[i].title;
                              sum++;
                          } else {
                              break;
                          }
                      }
                  }
              }
          }
          console.log(newArr);
          that.scheduleList[rowIndex].info = newArr;
          that.scheduleList[rowIndex].colInfo = arr;
          // that.$set(that.scheduleList[rowIndex], "colNum", colIndex);
            // that.initDrag();
            console.log(that.scheduleList);
        },
      });
    },
  },
};
</script>

<style lang='scss'>
.schedule-box {
  padding: 0 10px;
  .schedule-content {
    display: flex;
    tr,
    td,
    th {
      border: 1px solid #ccc;
      vertical-align: middle;
      padding: 5px;
    }
    th {
      line-height: 40px;
    }
  }
}
.search-box {
  padding: 10px 0;
  text-align: right;
}
.schedule-table {
  width: 75%;
  height: 520px;
  background: #eee;
  .user-info {
    display: flex;
    .img-box {
      display: flex;
      align-items: center;
      margin-right: 5px;
      .img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }
    }
    .basic-box {
      width: calc(100% - 30px);
      .user-name {
        font-weight: 700;
        font-size: 14px;
        margin-bottom: 10px;
      }
    }
    .time-box {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
    }
  }
}
.project-list {
  width: 25%;
  height: 520px;
  margin-left: 10px;
  background: #eee;
  border: 1px solid #ccc;
  .project-title {
    height: 50px;
    line-height: 50px;
    font-weight: 700;
    text-align: center;
    border-bottom: 1px solid #ccc;
  }
  .project-box {
    font-size: 14px;
    padding: 5px 0 10px 5px;
    cursor: move;
    .manage-name {
      padding: 5px 0;
    }
  }
}
.droppable-active {
  background: goldenrod;
}
</style>