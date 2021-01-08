
const FN = {
    getAllDate: (startTime, endTime) => {
        var date_all = []
        var i = 0
        while ((endTime.getTime() - startTime.getTime()) >= 0) {
          var year = startTime.getFullYear()
          var month = startTime.getMonth() + 1
          var day = startTime.getDate()
          date_all[i] = month + '月' + day + '日'
          startTime.setDate(startTime.getDate() + 1)
          i += 1
        }
        return date_all
    },
};
export default FN;