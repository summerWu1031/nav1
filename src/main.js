let $siteList =$('.siteList')
let $lastLi = $('.siteList').find('.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap =xObject || [
    {logo:'G', url:'https://github.com'},
    {logo:'B',url:'https://www.bilibili.com'},
    {logo:'S',url:'https://stackoverflow.com'},
    {logo:'I',url:'https://www.iconfont.cn'}
]

const simplifyUrl = (url)=>{
    return url.replace('https://','')
        .replace('http://','')
        .replace('www.','')
        .replace(/\/.*/,'')
}

const render = ()=>{
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node,index)=>{
        const $li = $( `<li>
            
                <div class="site">
                    <div class="logo">${node.logo[0]}</div>
                    <div class="link">${simplifyUrl(node.url)}</div>
                    <div class='close'>
                        <svg class="icon" >
                            <use xlink:href="#icon-close"></use>
                        </svg>
                    </div>
                </div>
             
        </li>`).insertBefore($lastLi)

        //代替a标签的作用
        $li.on('click',()=>{
            window.open(node.url)
        })
        $li.on('click','.close',(e)=>{
            e.stopPropagation() //阻止冒泡
            hashMap.splice(index,1)//删除了，但是没有重新渲染
            render()
        })
    })
}
render()

$('.addButton')
    .on('click', ()=>{
       let url = window.prompt('请输入您要添加的网址')
       if(url.indexOf('https')!==0){
           url = 'https://'+url
           console.log(url);
       }
    hashMap.push({
        logo:simplifyUrl(url)[0].toUpperCase(),
        url:url})
    
    render()
})

// 关闭页面时触发
window.onbeforeunload=()=>{
    //localStorage只能存字符串
    let string = JSON.stringify(hashMap)
    //在本地存储设置x，x的值为string
    localStorage.setItem('x',string)

}

$(document).on('keypress',(e=>{
    const key = e.key
    for(i=0;i<hashMap.length;i++){
        if(hashMap[i].logo.toLowerCase()===key){
            window.open(hashMap[i].url)
        }
    }
}))