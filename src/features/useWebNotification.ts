

export type NotificationOption = {
    title: string,
    body: string,
    icon?: string
}

export default function useWebNotification() {

   function notify(option: NotificationOption) {
        const {title, body, icon} = option;

        if(!Reflect.has(window, 'Notification')) {
            console.log("This browser does not support notifications");
            return;
        }

        Notification.requestPermission().then(perm => {                
            if(perm === 'granted') {
                new Notification(title,  {
                    body,
                    icon,
                    tag: 'pomodoro'
                })
            }
        })
    }

    return {
        notify
    }    
}