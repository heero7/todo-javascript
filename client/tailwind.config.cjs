module.exports = {
    mode: "jit",
    content: ["./src/**/*.{js,jsx}", "./public/index.html"],
    theme: {
        extend: {
            colors: {
                gray: {
                    900: "#202225",
                    800: "#2F3136",
                    700: "#36393F",
                    600: "#4F545C",
                    400: "#D4D7DC",
                    300: "#E3E5E8",
                    200: "#EBEDEF",
                    100: "#F2F3F5"
                }
            }
        }
    },
    plugins: []
};