const railwayRouteBuilderRoute=require('./routeBuilderApi');
const authRoute=require('./AuthenticationApi');
const transactionRoute=require('./TransactionApi');
const locationTrackingRoute=require('./locationTrackingApi');
const databaseBuilderRoute=require('./DatabaseBuilderApi');

const routes=[
    {
        path:'/routeBuilderApi', 
        handler: railwayRouteBuilderRoute
    },
    {
        path: '/authenticationApi',
        handler: authRoute
    },
    {
        path: '/transactionApi',
        handler: transactionRoute
    },
    {
        path: '/locationTrackingApi',
        handler: locationTrackingRoute
    },
    {
        path: '/databaseBuilderApi',
        handler: databaseBuilderRoute
    },
    {
        path: '/',
        handler:(req,res)=>{
            res.json({
                message: "Hello TrainKoi"
            })
        }
    }
]

module.exports = (app) => {
        routes.forEach(r =>{
            app.use(r.path,r.handler)
        })
}