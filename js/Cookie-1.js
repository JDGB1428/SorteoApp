/* eslint-disable new-parens */
let Cookie = new function name(params) {
    this.set = ({ key, value, day = 360 }) => {
        // document.cookie = "nombrecookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        var fecha = new Date();
        fecha.setTime(fecha.getTime() + (day * 24 * 60 * 60 * 1000));
        var expires = "expires=" + fecha.toUTCString();
        document.cookie = key + "=" + JSON.stringify(value) + ";" + expires + ";path=/";
    };

    this.get = (key) => {
        var cookies = document.cookie.split(";"); // Obtener todas las cookies
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.indexOf(key + "=") === 0) {
                return JSON.parse(cookie.substring(key.length + 1)); // Obtener el valor de la cookie
            }
        }
        return null; // La cookie no existe
    }
    this.exist = (key) => {
        var cookies = document.cookie.split(";"); // Obtener todas las cookies
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.indexOf(key + "=") === 0) {
                return true; // La cookie existe
            }
        }
        return false; // La cookie no existe
    }
    this.delete = (key) => {
        document.cookie = key + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
}
// export default Cookie;