
const FN = {
    getAllDate: (startTime, endTime) => {
        var startTime = new Date(startTime);
        var endTime = new Date(endTime);
        var date_all = []
        var i = 0
        while ((endTime.getTime() - startTime.getTime()) >= 0) {
          var year = startTime.getFullYear()
          var month = startTime.getMonth() + 1
          var day = startTime.getDate()
          month = month<10 ? '0'+month : month;
          day = day<10 ? '0'+day : day;
          date_all[i] = year+'/'+month+'/'+day
          startTime.setDate(startTime.getDate() + 1)
          i += 1
        }
        return date_all
    },
};
export default FN;