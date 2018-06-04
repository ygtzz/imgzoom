import assign from 'object-assign';

function ImgZoom(opts){
    opts = assign({
        smallc: '',
        scale: 1
    }, opts);

    this.opts = opts;
    this.doc = document.documentElement || document.body;
    this.smallc = document.querySelector(opts.smallc);
    this.smallcRect = this.smallc.getBoundingClientRect();
    this.smallcAbs = {
        top: this.smallcRect.top + this.doc.scrollTop,
        left: this.smallcRect.left + this.doc.scrollLeft
    };
    this.smallImg = this.smallc.querySelector('img');
    this.smallZoom = null;
    this.bigc = null;
    this.bigImg = null;
    
    this.smallc.onmouseover = () => {
        this._mouseover();
    };
    this.smallc.onmouseout = () => {
        this._mouseout();
    };
    this.smallc.onmousemove = (e) => {
        this._mousemove(e);
    };
}

ImgZoom.prototype._mouseover = function(){
    var self = this;
    if(!this.smallZoom){
        this.smallc.insertAdjacentHTML('beforeEnd','<span class="smallzoom j-smallzoom"></span>');
        this.smallZoom = document.querySelector('.j-smallzoom');
    }
    if(!this.bigc){
        var bigcOffset = 100,
            bigcLeft = this.smallcAbs.left + this.smallc.offsetWidth + bigcOffset,
            bigcTop = this.smallcAbs.top;
        document.body.insertAdjacentHTML('beforeEnd','<div style="top:'+bigcTop+'px;left:'+bigcLeft+'px;" class="bigc j-imgzoom-bigc"><img class="bigimg" /></div>');
        this.bigc = document.querySelector('.j-imgzoom-bigc');
        this.bigImg = this.bigc.firstChild;
    }
    //小图为最新的容器子元素
    this.smallImg = this.smallc.querySelector('img');
    //大图为最新的小图对应的大图
    var bigImg = this.bigImg;
    bigImg.src = this.smallImg.getAttribute('data-big');
    //显示小图放大镜和大图
    this.smallZoom.style.display = 'inline-block';
    this.bigc.style.display = 'block';
}

ImgZoom.prototype._mouseout = function(){
    this.smallZoom.style.display = 'none';
    this.bigc.style.display = 'none';
}

ImgZoom.prototype._mousemove = function(e){
    var smallZoomWidth = this.smallZoom.offsetWidth,
        smallZoomHeight = this.smallZoom.offsetHeight,
        left = e.clientX - this.smallcRect.left - smallZoomWidth/2,
        top = e.clientY - this.smallcRect.top - smallZoomHeight/2;
    left = mid(0,this.smallc.offsetWidth - smallZoomWidth,left);
    top = mid(0,this.smallc.offsetHeight - smallZoomHeight,top);

    this.smallZoom.style.top = top + 'px';
    this.smallZoom.style.left = left + 'px';

    //大图与小图必须是等比的，否则位置显示将不准确
    var ratio = (this.bigImg.offsetWidth - this.bigc.offsetWidth)/(this.smallImg.offsetWidth - smallZoomWidth);

    this.bigImg.style.top = -ratio * top + 'px';
    this.bigImg.style.left = -ratio * left + 'px';
}

function mid(min,max,mid){
    return Math.min(Math.max(min,mid),max);
}


export {ImgZoom};
