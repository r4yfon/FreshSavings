
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



  
    
    #CONNECT
    $connMgr = new ConnectionManager();
    $pdo = $connMgr->getConnection();
    #PREPARE
    
    

    $sql = "select pid, Ingredient.iid, Ingredient.iname, selling_price, selling_quantity, said, posting_status, icat, image from Posting, Ingredient where Posting.iid = Ingredient.iid";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $result = [];
    while($row = $stmt->fetch()) { 
        $each_posting = 
        ["pid" => $row['pid'], 
        "iid" => $row['iid'], 
        "iname" => $row['iname'], 
        "selling_price" => $row['selling_price'], 
        "selling_quantity" => $row['selling_quantity'], 
        "said" => $row['said'],
        "posting_status" => $row['posting_status'], 
        "icat" => $row['icat'], 
        "image" => $row['image'], 
    ];
    
        array_push($result, $each_posting);
    }
    
    
    echo json_encode($result);
    exit;






?>