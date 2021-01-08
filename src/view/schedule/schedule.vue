<template>
  <div class="schedule-box">
    <div>资源排程</div>
    <div class="schedule-content">
      <div class="schedule-table">
        <table width="100%" border="1" style="border-collapse: collapse">
          <tr>
            <th width="20%">人员</th>
            <th width="80%">日期</th>
          </tr>
          <tr v-for="(item,index) in scheduleList" :key="item.id">
            <td :class="'target' + index">
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
            <td :class="'target' + index + 1">教育</td>
            <!-- <td :class="'target' + (index + 1) + 3">教育</td>
            <td :class="'target' + (index + 1) + 4">教育</td> -->
          </tr>
        </table>
      </div>
      <div class="project-list">
         <div class="project-title">项目清单</div>
         <ul>
            <vuedraggable v-model="projectList" @start="onStart($event)" @end="onEnd($event)">
                <transition-group :sort='false'>
                    <li class= "project-box" v-for="(item, index) in projectList" :key='item.id' 
                    :data-value='JSON.stringify(item)' :class="'draggable' + index">
                        <div class='manage-name'>{{item.name}}</div>
                        <div>
                            <span>{{item.title.slice(0,15)}}</span>
                            <span>({{item.start}} ~ {{item.end}})</span>
                        </div>
                    </li>
                </transition-group>
            
            </vuedraggable>  
            
         </ul>
      </div>
    </div>
  </div>
</template>

<script>
import "../../mock/index.js";
import vuedraggable from 'vuedraggable'
export default {
  name: "Schedule",
  data() {
    return {
      scheduleList: [],
      projectList: [],
    };
  },
  components: {
      vuedraggable
  },
  mounted() {
    // 列表数据
    this.getSchedule();
    // 项目数据
    this.getProject();
  },
  methods: {
    /** 获取列表数据 */
    getSchedule() {
      this.$axios.post("/getScheduleList").then((res) => {
        console.log(res);
        if (res.status == 200) {
          this.scheduleList = res.data.scheduleList;
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
    onStart(e){
        console.log(JSON.parse(e.item.dataset.value))
    },
    onEnd(e){
        console.log(e)
    }
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
  .project-title{
      height: 50px;
      line-height: 50px;
      font-weight: 700;
      text-align: center;
      border-bottom: 1px solid #ccc;
  }
  .project-box{
      font-size: 14px;
      padding: 5px 0 10px 5px;
      cursor: pointer;
      .manage-name{
          padding: 5px 0;
      }
  }
}
</style>