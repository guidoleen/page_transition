// Init for the first time
var mnt = 0;
var yr = 0;
var lang = "";

function initDate(Lang) {
    var D = new Date();
    yr = D.getFullYear();
    mnt = D.getMonth() + 1;

    lang = Lang;
    if (lang == 0) lang = "NL";

    loadCal("js_kal", yr, mnt, lang);
}

// Set The Date for the Calender
function SetTheDate(yr, mnth)
{
    var D = new Date(yr, mnth, 0);
    var _Yr = D.getFullYear();
    var _Dy = D.getDay();
    var _Dnr = D.getDate();
    var _Mnth = D.getMonth()+1; // +1 for the loop and the exact month
    
    var _Dn1 = _Dnr - _Dy;
    _Dn1 = _Dn1 % 7;

    this.Yr = _Yr;
    this.Mnth = _Mnth;
    this.Dy = _Dy;
    this.Dnr = _Dnr;
    this.Dn1 = (7 - _Dn1); // index nr for first day in row

    var D2 = new Date(_Yr, _Mnth, 0).getDate(); // get the total days month
    this.DinM = D2; // total days in month from index number!!

}

// The LoadCall function - The heart of the Calendar
function loadCal(strDiv, yr, mnth, lang)
{
    var currD = new Date().getFullYear(); // only for the current date

    var Gd = new SetTheDate(yr, mnth);

    i = 0;
    k = Gd.Dn1;
    var strTR = "<tr></tr>";
    var strBuild = "<table>" + strTR;
    strBuild += loadCalDays(Gd.Yr, Gd.Mnth, lang);

    while (i < ( Gd.DinM + Gd.Dn1) )
    {
        strBuild += "<td>" + "  " + "</td>";
        if (i == Gd.Dn1-1)
        {
            for (j = 1; j <= Gd.DinM; j++)
            {
                if (k > 7-1)
                {
                    strBuild += strTR;
                    k = 0;
                }
                k++;

                if (j == Gd.Dnr && yr == currD)
                {
                    strBuild += "<td class='c_hlight'>" + j + "</td>";
                }
                else
                {
                    strBuild += "<td>" + j + "</td>";
                }
            }
        }
        if (i >= Gd.Dn1 - 1) break;
        i++;
    }
    document.getElementById(strDiv).innerHTML = "</table>" + strBuild;
    InitDoc(); // for the elements and events in the calendar
}

// function loadCalDays in thead
function loadCalDays(yr, month, Lang) {
    strTh = "<thead>";

    strTh += "<tr>";
    strTh += "<td id='prevyr'> \<< </td>";
    strTh += "<td colspan='1'><input id='in_yr' type='text' value='" + yr + "'></td>";
    strTh += "<td id='nextyr'> \>> </td>";
    strTh += "<td id='prevmnt'> \<< </td>";
    strTh += "<td colspan='1'><input id='in_mnt' type='text' value='" + month + "'></td>";
    strTh += "<td id='nextmnt'> \>> </td>";
    strTh += "<td id='but_yr'></td>";
    strTh += "</tr>";

    strTh += "<tr>" + LoadTranslation(Lang) + "</tr>";
    strTh += "</thead>";
    return strTh;
}

// Init document controls - EVENTS 
function InitDoc()
{
    objInyr = document.getElementById("in_yr");
    objInMn = document.getElementById("in_mnt");

    objprevyr = document.getElementById("prevyr");
    objnextyr = document.getElementById("nextyr");
    objprevm = document.getElementById("prevmnt");
    objnextm = document.getElementById("nextmnt");
    objbut_yr = document.getElementById("but_yr");


    objbut_yr.onclick = function () {
        yr = parseInt(objInyr.value);
        if (!ChkNan(yr))
            loadCal("js_kal", yr, mnt, lang);
    }

    objInyr.onkeypress = function (event)
    {
        if (event.keyCode == 13)
        {
            yr = parseInt(objInyr.value);
            if (!ChkNan(yr))
                loadCal("js_kal", yr, mnt, lang);
        }
    }

    objprevyr.onclick = function () {
        yr = parseInt(objInyr.value) - 1;
        if (!ChkNan(yr))
            loadCal("js_kal", yr, mnt, lang);
    }

    objnextyr.onclick = function () {
        yr = parseInt(objInyr.value) + 1;
        if ( !ChkNan(yr))
            loadCal("js_kal", yr, mnt, lang);
    }

    objprevm.onclick = function () {
        mnt = ChkMonth( parseInt(objInMn.value) - 1 );
        if (!ChkNan(mnt))
            loadCal("js_kal", yr, mnt, lang);
    }

    objnextm.onclick = function () {
        mnt = ChkMonth( parseInt(objInMn.value) + 1 );
        if (!ChkNan(mnt))
            loadCal("js_kal", yr, mnt, lang);
    }
}

// Check if Nan
function ChkNan(iNr) {
    isNaN(iNr);
        return false;
}

// Month till 12
function ChkMonth(iNr)
{
    if (iNr > 12) iNr = 1;
    if (iNr < 1) iNr = 1;

    return iNr;
}

// JSON Translations
var NL_DayNames = '{"d0":"ma", "d1":"di", "d2":"wo", "d3":"do", "d4":"vr", "d5":"za", "d6":"zo"}';
var FR_DayNames = '{"d0":"lu", "d1":"mar", "d2":"mer", "d3":"jeu", "d4":"ven", "d5":"sam", "d6":"dim"}';

// function load translation
function LoadTranslation(Lang)
{
    var jsLang;
    
    if (Lang == "NL") jsLang = JSON.parse(NL_DayNames);
    if (Lang == "FR") jsLang = JSON.parse(FR_DayNames);

        if (jsLang == 0) return "";

    var strVal = "";
    for (var key in jsLang)
    {
        strVal += "<td>" + jsLang[key] + "</td>";
    }
    return strVal;
}
