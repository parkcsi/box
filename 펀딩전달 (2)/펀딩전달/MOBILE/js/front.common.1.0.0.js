// Timestamp to formatDate
function _formatDate(s, format){
    var d = new Date(s);
    if(format == null){
        return d.getFullYear() + "-" + lpad((d.getMonth() + 1), 2, '0') + "-"+ lpad(d.getDate(), 2, '0')
        + " " + lpad(d.getHours(), 2, '0') + ":" + lpad(d.getMinutes(), 2, '0') + ":" + lpad(d.getSeconds(), 2, '0');
    } else if(format == "yyyy.MM.dd"){
        return d.getFullYear() + "." + lpad((d.getMonth() + 1), 2, '0') + "."+ lpad(d.getDate(), 2, '0');
    } else if(format == "yyyy-MM-dd"){
        return d.getFullYear() + "-" + lpad((d.getMonth() + 1), 2, '0') + "-"+ lpad(d.getDate(), 2, '0');
    }
}