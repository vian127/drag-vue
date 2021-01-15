import Mock from 'mockjs';
/** 人员信息 */
Mock.mock('/getScheduleList', { 
    'scheduleList|3-8':[{
        'id|+1':1,
        'name':'@cname',
        "image": "@image(40x40)",
        "time": '@date("HH:MM")',
        "percent": "@float(60, 80, 0, 0)", 
        "info": [], // 渲染表格列
        "colInfo": [], // 需要合并的信息
        "lastColIndex": 1, // 记录最后一次索引
        "lastRowIndex": 0, // 记录行数
        "num": 1, // 记录次数
    }],
});
/** 项目信息 */
Mock.mock('/getProjectList', { 
    'projectList|3-8':[{
        'id|+1':1,
        'title':'@csentence',
        'name':'@cname',
        'start|1': ['2021/01/01','2021/01/02','2021/01/03','2021/01/04','2021/01/05'],
        "end|1":  ['2021/01/06','2021/01/07','2021/01/08','2021/01/09','2021/01/10'],
    }]
});
