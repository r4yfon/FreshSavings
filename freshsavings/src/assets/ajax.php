
<?php
class ConnectionManager {
    public function getConnection() {
      $servername = 'wad2-g7t2.c2ttwb5huwip.ap-southeast-1.rds.amazonaws.com';
      $dbname = 'freshsavings';
      $username = 'g7t2';
      $password = 'wad2g7t2';
      $port = 3306;
      $url  = "mysql:host=$servername;dbname=$dbname;port=$port";
      return new PDO($url, $username, $password);
    }
  }



  if(isset($_GET['pid'])){
    
    #CONNECT
    $connMgr = new ConnectionManager();
    $pdo = $connMgr->getConnection();
    #PREPARE
    $pid = $_GET['pid'];
    

    $sql = "select Posting.pid, Ingredient.iid, expiring_in, selling_price, selling_quantity, fname, lname, address, iname, icat, price, image
    from Posting, Account, Ingredient where Posting.said = Account.aid and Posting.iid = Ingredient.iid and Posting.pid = :pid";
    
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':pid', $pid, PDO::PARAM_INT);
    $stmt->setFetchMode(PDO::FETCH_ASSOC);
    $stmt->execute();
    
    #IF SINGLE DATA
    
    if($row = $stmt->fetch()) { 
        
        $result = 
        ["pid" => $row['pid'], 
        "iid" => $row['iid'], 
        "expiring_in" => $row['expiring_in'], 
        "selling_price" => $row['selling_price'], 
        "selling_quantity" => $row['selling_quantity'], 
        "fname" => $row['fname'], 
        "lname" => $row['lname'], 
        "address" => $row['address'], 
        "iname" => $row['iname'], 
        "icat" => $row['icat'], 
        "price" => $row['price'],
        "image" => $row['image']];
    }
    echo json_encode($result);
    exit;
    }






?>