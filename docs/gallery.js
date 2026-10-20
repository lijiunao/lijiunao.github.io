import PhotoSwipeLightbox from './vendor/photoswipe-lightbox.esm.min.js';
const ids=['galan','hshb','unilever','suning'];
const names=['品牌与产品经营','全国门店运营','区域渠道管理','彩电销售与团队'];
const lightbox=new PhotoSwipeLightbox({dataSource:ids.map((id,i)=>({src:`assets/${id}-work.webp`,width:1536,height:1024,alt:`李振文 · ${names[i]}`})),pswpModule:()=>import('./vendor/photoswipe.esm.min.js'),bgOpacity:.94,showHideAnimationType:'fade',closeTitle:'关闭图片',zoomTitle:'放大图片',arrowPrevTitle:'上一张',arrowNextTitle:'下一张',errorMsg:'图片未能加载，请稍后重试。',padding:{top:40,bottom:40,left:20,right:20}});
lightbox.init();
document.addEventListener('click',event=>{const anchor=event.target.closest('[data-photo]');if(!anchor)return;event.preventDefault();const index=ids.indexOf(anchor.dataset.photo);if(index>=0)lightbox.loadAndOpen(index);});
window.addEventListener('hashchange',()=>lightbox.pswp?.close());
