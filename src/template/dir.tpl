<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{title}}</title>
	<style>
		*{
			margin: 0;
			padding: 0;
		}
		.m-header{
			padding: 20px 50px;
			font-size: 14px;
			line-height: 2;
			color: #000;
			border: 1px dashed #ccc;
		}
		.m-dir{
			padding: 50px;
		}
		.m-dir .m-dir__item a{
			font-size: 16px;
			line-height:2;
			color: blue;
		}
		.m-dir .m-dir__item a:hover{
			color: orangered;
		}
	</style>
</head>
<body>
	<div class="m-header">
		当前目录：<a href='./'>{{root}}</a> {{dir}}
		</div>
	<div class="m-dir">
		{{#each files}}
		<div class="m-dir__item">
			<a href="{{../dir}}/{{this}}">{{this}}</a>
		</div>
		{{/each}}
	</div>
</body>
</html>
