<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=6q, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Post</title>
</head>
<body>
<div class="__container" style="width:90%;margin:20px auto;">
  <form>
    <div>
        <button id="__object_type" value="1"></button>
    </div>
    <label for="deposit">Deposit</label>
    <input type="number" id="__deposit" name="deposit" placeholder="Deposit" required>
    <div class="error_class hide"></div>
    <br>
    <label for="months">Month</label>
    <select id="__months" class="months" name="months"></select>
    <div class="error_class_form hide"></div>
    <br>
    <input type="submit" value="Submit" id="__submit">
  </form>
  <br>
  <br>
  <div class="result_div"></div>
</div>
    <script src="post.js"></script>
</body>
</html>