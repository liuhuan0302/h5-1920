async function fn1(next)
{
    console.log("fn1")
    await next()
    console.log('end fn1')
}

async function fn2(next)
{
    console.log("fn2")
    await delay()
    await next()
    console.log('end fn2')
}


async function fn3(next)
{
    console.log("fn3")
}


function delay()
{
    return new Promise((r)=>{
        setTimeout(()=>{
            r();
        },2000)
    })
}

function compose(middlewares=[fn1,fn2,fn3])
{
    function dispatch(i)
    {
        let fn=middlewares[i]
        if(!fn){
            return Promise.resolve()
        }
        else
        {
            return new Promise((resolve)=>{
                resolve(fn(function next () {
                    return dispatch(i + 1)
                }));
            });
        }
    }

    return dispatch(0);
}
compose();