const UPDATE_SUBSCRIPTIONS = {
    'controlYear': [      
        { 
            id: 'control-container', 
            getHtml: () => createControlHtml() 
        },
        {
            id: 'taishui-container', 
            getHtml: () => getTaishuiHtml() 
        }
    ]
};