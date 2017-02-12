var chart = null;
var rotate = 0;
var rotateY = 0;
var textColor = '#ffffff';
var isSmall = false;
var fontsizeN = 12;
var fontsizeS = 10;
var isLegend = true;
var scaleSpace = 0;
var endScale = 0;

var title = '当前无数据';
var data = [{name: '当前无数据', value: 0, color: '#CD4C43'}];
var labels = [" ", " ", " ", " ", " ", " "];

function showLDChart(json, style, chartType) {
    setChartStyle(style);

    title = '当前无数据';
    data = null;
    if (json != null) {
        if (json == 'Loading') {
            isReload = true;
            title = '正在加载数据...';
        } else {
            title = json.title;
            data = json.data;
            if (json.labels != null) {
                labels = json.labels;
            }
            if (data == null) {
                title = '解析数据失败';
            }
        }
    }

    if (data == null) {
        getDefaultData(title, chartType);
    }
    setRotate(chartType);
}

function getDefaultData(msg, chartType) {
    if (chartType == 'Line2D') {
        data = [{name: msg, value: [0, 0, 0, 0, 0, 0], color: '#1f7e92', line_width: 2}];
        labels = [" ", " ", " ", " ", " ", " "];
    } else {
        data = [{name: msg, value: 0, color: '#CD4C43'}];
    }
}

function setChartStyle(style) {
    rotate = 0;
    textColor = '#ffffff';
    isSmall = false;
    fontsizeN = 12;
    fontsizeS = 8;
    isLegend = true;

    if (style != null) {
        if (style.isSmall != null) {
            isSmall = style.isSmall;
        }
        if (style.textColor != null) {
            textColor = style.textColor;
        }
        if (style.isLegend != null) {
            isLegend = style.isLegend;
        }
    }
}

function setRotate(chartType) {
    // 根据内容判断是否需要旋转
    var totalLength = 0;
    var maxLength = 0;
    var maxValue = 0;
    var size = 0;

    if (chartType == 'Line2D') {
        size = labels.length;
        for (var i = 0; i < size; i++) {
            var temp = labels[i].length;
            if (maxLength < temp) {
                maxLength = temp;
            }
            totalLength += temp;
        }

        for (var i = 0; i < data.length; i++) {
            var values = data[i].value;
            for (var k = 0; k < values.length; k++) {
                if (maxValue < Number(values[k])) {
                    maxValue = Number(values[k]);
                }
            }
        }
    } else {
        size = data.length;
        for (var i = 0; i < size; i++) {
            var temp = data[i].name.length;
            if (maxLength < temp) {
                maxLength = temp;
            }
            totalLength += temp;
        }

        for (var i = 0; i < data.length; i++) {
            if (maxValue < Number(data[i].value)) {
                maxValue = Number(data[i].value);
            }
        }
    }
    var rotateLimit = isSmall ? 5 : 7
    rotate = 0;
    if (size > 1 && (size >= rotateLimit * 2 || maxLength >= rotateLimit || totalLength >= 22)) {
        rotate = -30;
    }

    rotateY = 0;
    if (maxValue >= 1000) {
        rotateY = -30;
    }

    if (chartType == 'Line2D' || chartType == 'Column2D') {
        var scaleShare = 5;
        if (maxValue >= scaleShare) {
            scaleSpace = Math.ceil(maxValue / scaleShare);
            if (scaleSpace >= scaleShare) {
                var temp = scaleSpace;
                var count = scaleShare;
                while (temp >= scaleShare * 10) {
                    count = count * 10;
                    temp = Math.floor(temp / 10);
                }

                while (scaleSpace % count > 0) {
                    scaleSpace += 1;
                }
            } else {
                if (scaleSpace % 2 > 0) {
                    scaleSpace += 1;
                }
            }
            endScale = Math.ceil(maxValue / scaleSpace) * scaleSpace;
        } else {
            scaleSpace = 1;
            endScale = scaleShare;
        }
    }
}

function getTitleJson() {
    return {
        text: title,
        fontweight: 300,
        fontsize: (isSmall ? 16 : 24),
        offsety: (isSmall ? -10 : 0),
        color: textColor
    };
}

