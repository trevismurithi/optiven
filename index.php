<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=6q, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Document</title>
</head>
<body>
<div style="width:90%;margin:20px auto;">
  <form>
    <label for="places">Project of Interest</label>
    <select id="places" name="places" required>
    </select>
    <label for="deposit">Deposit</label>
    <input type="number" id="deposit" name="deposit" placeholder="Deposit" required>
    <div class="error_class hide"></div>
    <br>
    <label for="months">Month</label>
    <select id="months" class="months" name="months">
    </select>
    <div class="error_class_form hide"></div>
    <br>
    <input type="submit" value="Submit" id="submit">
  </form>
  <br>
  <br>
  <div class="result_div"></div>
</div>
    <script src="app.js"></script>
</body>
</html>