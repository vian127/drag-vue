<template>
  <div class="schedule-box">
    <div>资源排程</div>
    <div class="search-box">
      <el-date-picker
        v-model="timeRange"
        type="daterange"
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
            <th v-for="(item, index) in dateArr" :key="index">{{ item }}</th>
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

            <!-- <td
              :id="'target' + index + 1"
              v-if="item.colNum"
              :colspan="item.colNum"
            >
              <div>教育</div>
            </td> -->
            <template v-for="(dateItem, ind) in dateArr">
              <td :id="'target' + index + ind" v-if='item.colNum && ind == item.colIndex-1' :key="ind" :colspan="item.colNum">
                <div>教育1</div>
              </td>
              <td :id="'target' + index + ind" v-if='!item.colNum || ind > ((item.colIndex-1 + item.colNum)-1) || ind < item.colIndex-1' :key="ind">
                <div>教育2</div>
              </td>
            </template>

            <!-- <td :class="'target' + (index + 1) + 4">教育</td> -->
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
// import '../../../static/jQuery1.11.3.min.js'
import "../../../static/jquery-ui.js";
import FN from "../../util/date.js";
export default {
  name: "ScheduleJquery",
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
        console.log(res);
        if (res.status == 200) {
          this.scheduleList = res.data.scheduleList;
          //   this.scheduleList[1].colIndex = 1;
          //   this.scheduleList[1].colNum = 2;
          console.log(this.scheduleList);
        }
      });
    },
    /**获取项目数据 */
    getProject() {
      this.$axios.post("/getProjectList").then((res) => {
        console.log(res);
        if (res.status == 200) {
          this.projectList = res.data.projectList;
        }
      });
    },
    /** 日期查询 */
    dateChange() {
      this.dateArr = FN.getAllDate(this.timeRange[0], this.timeRange[1]);
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
          $(this).children().remove();
          // var source = ui.draggable.clone();
          var title = JSON.parse(ui.draggable[0].dataset.value).title;
          var source =
            "<div class='box-move'>" +
            "<span>" +
            title +
            "</span>" +
            "<i class='el-icon-delete img' style='display:none;'></i>" +
            "</div>";
          $(this).append(source);
          $(this)
            .find(".box-move")
            .mouseenter(function () {
              $(this).find(".img").show();
            });

          $(this)
            .find(".box-move")
            .mouseleave(function () {
              $(this).find(".img").hide();
            });

          $(this)
            .find(".img")
            .click(function () {
              $(this).parent(".box-move").remove();
            });
          that.$set(that.scheduleList[1], "colIndex", 3);
          that.$set(that.scheduleList[1], "colNum", 2);
          console.log(that.scheduleList)
          // that.initDrag();
          //  that.getSchedule();
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