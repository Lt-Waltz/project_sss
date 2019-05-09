<?php
// used to get mysql database connection
class Database{

    // specify your own database credentials
    private $host = "localhost";
    private $dbname = "api_db";
    private $username = "root";
    private $password = "ryhma8password";
    private $charset = "utf8mb4";
    public $conn;

    // get the database connection
    public function getConnection(){

        $this->conn = null;

        try{
            $dsn = "mysql:host=" . $this->host . ";dbname=" . $this->dbname . ";charset" . $this->charset;
            $this->conn = new PDO($dsn, $this->username, $this->password);
            echo "Connected!";
        }catch(PDOException $exception){
            echo "Connection error: " . $exception->getMessage();
        }

        return $this->conn;
    }
}
?>