module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "globals":{
        global:true,
        process:true
    },
	"parser":"babel-eslint",
    "parserOptions": {
        "ecmaVersion": 2015,
        "sourceType": "script"
    },
    "rules": {
    	"no-console":[
    		"off"
		],
        "no-unused-vars":[
            "off"
        ],
        "indent": [
            "error",
            "tab"
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};
