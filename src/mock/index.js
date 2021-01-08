import Mock from 'mockjs';
/** 人员信息 */
Mock.mock('/getScheduleList', { 
    'scheduleList|3-8':[{
        'id|+1':1,
        'name':'@cname',
        "image": "@image(40x40)",
        "time": '@date("HH:MM")',
        "percent": "@float(60, 80, 0, 0)", 
    }],
});
/** 项目信息 */
Mock.mock('/getProjectList', { 
    'projectList|3-8':[{
        'id|+1':1,
        'title':'@csentence',
        'name':'@cname',
        "start": "@date(MM/dd)",
        "end": "@date(MM/dd)",
    }]
});
