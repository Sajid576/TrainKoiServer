const railwayRouteBuilderRoute=require('./routeBuilderApi');
const userDataRoute=require('./UserDataRoute');
const transactionRoute=require('./TransactionApi');
const locationTrackingRoute=require('./TrainLocationRoute');
const databaseBuilderRoute=require('./DatabaseBuilderApi');
const contactApiRoute=require('./contactApiRoute');

const routes=[
    {
        path:'/routeBuilderApi', 
        handler: railwayRouteBuilderRoute
    },
    {
        path: '/userDataApi',
        handler: userDataRoute
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
        path:'/contactApi',
        handler: contactApiRoute
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