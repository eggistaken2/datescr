var dateScr = {};
dateScr.dateFormats = ["dd/mm/yyyy", "mm/dd/yyyy", "dd/mm/yy", "mm/dd/yy", "yyyy-mm-dd", "MM dd yyyy", "unix"];
dateScr.shortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
dateScr.longMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
dateScr.timeFormats = ["hh:mm", "hh:mm:ss", "hh:mm:ss.mmm", "ss", "mmm"];
dateScr.changeDateFormat = function (date, dateFormat, newFormat) {
	if (!dateScr.dateFormats.includes(dateFormat) || !dateScr.dateFormats.includes(newFormat)) return console.log(`Invalid date format! Accepted formats are: ${dateScr.dateFormats.join(", ")}`);
	if (dateFormat == newFormat) return console.log("The current format and new format are the same.");
	if (dateFormat == "unix") date = String(new Date(date)).split(" ").slice(1, 4).join(" ");
	if (newFormat == "unix") {
		if (dateFormat != "MM dd yyyy") date = dateScr.changeDateFormat(date, dateFormat, "MM dd yyyy");
		return new Date(date).getTime();
	}
	if (["dd/mm/yyyy", "mm/dd/yyyy", "dd/mm/yy", "mm/dd/yy"].includes(dateFormat)) {
		var year = +date.split("/")[2];
	}
	if (["dd/mm/yy", "mm/dd/yy"].includes(dateFormat)) {
		year = new Date(Date.now()).getYear() - 100 < year ? year + 1900 : year + 2000;
	}
	else if (!["dd/mm/yyyy", "mm/dd/yyyy"].includes(dateFormat)) var year = dateFormat == "yyyy-mm-dd" ? +date.split("-")[0] : +date.split(" ").at(-1);
	if (["dd/mm/yyyy", "dd/mm/yy"].includes(dateFormat)) var month = +date.split("/")[1]
	else if (["mm/dd/yyyy", "mm/dd/yy"].includes(dateFormat)) var month = +date.split("/")[0]
	else if (dateFormat == "yyyy-mm-dd") var month = +date.split("-")[1];
	else {
		var month = date.split(" ")[0];
		if (dateScr.shortMonths.indexOf(month) != -1) month = dateScr.shortMonths.indexOf(month) + 1
		else if (dateScr.longMonths.indexOf(month) != -1) month = dateScr.longMonths.indexOf(month) + 1
		else return console.log("Invalid month!");
	}
	if (month > 12 || month < 1) return console.log("Month is out of bounds!");
	if (["dd/mm/yyyy", "dd/mm/yy"].includes(dateFormat)) var day = +date.split("/")[0]
	else if (["mm/dd/yyyy", "mm/dd/yy"].includes(dateFormat)) var day = +date.split("/")[1]
	else if (dateFormat == "yyyy-mm-dd") var day = +date.split("-").at(-1)
	else var day = +date.split(" ")[1];
	if (day > 31 || day < 1) return console.log("Day is out of bounds!");
	day = String(day).padStart(2, 0);
	month = String(month).padStart(2, 0);
	year = String(year).padStart(4, 0);
	switch (newFormat) {
		case "dd/mm/yyyy":
			return day + "/" + month + "/" + year
		case "mm/dd/yyyy":
			return month + "/" + day + "/" + year
		case "dd/mm/yy":
			return day + "/" + month + "/" + String(year).slice(-2)
		case "mm/dd/yy":
			return month + "/" + day + "/" + String(year).slice(-2)
		case "yyyy-mm-dd":
			return year + "-" + month + "-" + day
		case "MM dd yyyy":
			return dateScr.longMonths[month - 1] + " " + day + " " + year
	}
}
dateScr.changeTimeFormat = function (time, timeFormat, newFormat) {
	if (!dateScr.timeFormats.includes(timeFormat) || !dateScr.timeFormats.includes(newFormat)) return console.log(`Invalid time format! Accepted formats are: ${dateScr.timeFormats.join(", ")}`);
	var time = String(time).split(":");
	var hours, minutes, seconds, milliseconds;
	if (timeFormat == "ss") {
		hours = Math.floor(+time / 3600);
		minutes = Math.floor(+time / 60) % 60;
		seconds = +time % 60;
	}
	else if (timeFormat == "mmm") {
		hours = Math.floor(+time / 3600000);
		minutes = Math.floor(+time / 60000) % 60;
		seconds = Math.floor(+time / 1000) % 60;
		milliseconds = +time % 1000;
	}
	else {
		hours = +time[0];
		if (hours < 0) return console.log("Hours are out of bounds!");
		minutes = +time[1];
		if (minutes > 59 || minutes < 0) return console.log("Minutes are out of bounds!");
		if (timeFormat.includes("ss")) {
			var temp = time[2].split(".");
			seconds = +temp[0];
			if (seconds > 59 || seconds < 0) return console.log("Seconds are out of bounds!");
			milliseconds = temp.length == 2 ? +temp[1] : 0;
			if (milliseconds > 999 || milliseconds < 0) return console.log("Milliseconds are out of bounds!");
		}
		else var seconds = 0, milliseconds = 0;
	}
	switch (newFormat) {
		case "hh:mm":
			return String(hours).padStart(2, 0) + ":" + String(minutes).padStart(2, 0)
		case "hh:mm:ss":
			return String(hours).padStart(2, 0) + ":" + String(minutes).padStart(2, 0) + ":" + String(seconds).padStart(2, 0)
		case "hh:mm:ss.mmm":
			return String(hours).padStart(2, 0) + ":" + String(minutes).padStart(2, 0) + ":" + String(seconds).padStart(2, 0) + "." + String(milliseconds).padStart(3, 0)
        case "ss":
			return hours * 3600 + minutes * 60 + seconds
        case "mmm":
			return hours * 3600000 + minutes * 60000 + seconds * 1000 + milliseconds
	}
}
return dateScr;
