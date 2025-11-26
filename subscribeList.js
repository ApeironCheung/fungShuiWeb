const UPDATE_SUBSCRIPTIONS = {
    'controlYear': [      
        { 
            id: 'control-container', 
            getHtml: () => createControlHtml() 
        },{
            id: 'chart-display-container', 
            getHtml: () => getFlyingStarChartHtml() 
        },
        {
            id: 'taishui-container', 
            getHtml: () => getTaishuiHtml() 
        }
    ]
};