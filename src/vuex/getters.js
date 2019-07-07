//获取具体某篇blog的信息
export const getBlogInfo = state => {
    const data =state.blogList;
    const k =state.id;
    let b = [];   
    for(let i=0;i<data.length;i++){       
        if(data[i].id===k){
            b.push(data[i])
            return b;
        }
    }  
};
