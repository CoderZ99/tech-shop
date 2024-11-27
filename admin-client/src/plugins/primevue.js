import Editor from 'primevue/editor';
import PrimeVue from 'primevue/config';

// Chỉ import CSS cho Editor component
import 'primevue/resources/themes/lara-light-blue/theme.css';
import '/node_modules/primevue/resources/primevue.min.css';

export function setupPrimeVue(app) {
    app.use(PrimeVue, {
        ripple: true,
        unstyled: true, // Disable PrimeVue's base styling
    });
    
    // Đăng ký chỉ component Editor
    app.component('PrimeEditor', Editor);
}
