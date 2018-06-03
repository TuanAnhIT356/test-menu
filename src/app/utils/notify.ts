declare let $: any;

export default function  Notify(icon: string, title: string, message: string, type: string) {
    $.notify({
        // options
        icon: icon,
        title: title,
        message: message,
        target: '_blank'
    }, {
        // settings
        element: 'body',
        position: null,
        type: type,
        allow_dismiss: true,
        newest_on_top: false,
        showProgressbar: false,
        placement: {
            from: 'top',
            align: 'right'
        },
        offset: 20,
        spacing: 10,
        z_index: 1031,
        delay: 5000,
        timer: 1000,
        url_target: '_blank',
        mouse_over: null,
        animate: {
            enter: 'animated fadeInDown',
            exit: 'animated fadeOutUp'
        },
        icon_type: 'class',
    });
}
