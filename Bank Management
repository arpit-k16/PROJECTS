
print("****BANK TRANSACTION****") 

# Creating database connection
import mysql.connector

try:
    mydb = mysql.connector.connect(host="localhost", user="root", passwd="help")
    mycursor = mydb.cursor()
    mycursor.execute("CREATE DATABASE IF NOT EXISTS bank")
    mycursor.execute("USE bank")
    
    # Creating required tables
    mycursor.execute("""
    CREATE TABLE IF NOT EXISTS bank_master (
        acno CHAR(4) PRIMARY KEY,
        name VARCHAR(30),
        city CHAR(20),
        mobileno CHAR(10),
        balance INT(6)
    )""")
    
    mycursor.execute("""
    CREATE TABLE IF NOT EXISTS banktrans (
        acno CHAR(4),
        amount INT(6),
        dot DATE,
        ttype CHAR(1),
        FOREIGN KEY (acno) REFERENCES bank_master(acno)
    )""")
    
    mydb.commit()
    
    while True:     
        print("1=Create account") 
        print("2=Deposit money") 
        print("3=Withdraw money") 
        print("4=Display account") 
        print("5=Exit") 
        
        try:
            ch = int(input("Enter your choice: "))
            
            # Procedure for creating a new account
            if ch == 1:
                print("All information prompted are mandatory to be filled") 
                acno = input("Enter account number (4 digits): ").strip()
                name = input("Enter name (limit 30 characters): ").strip()
                city = input("Enter city name: ").strip()
                mn = input("Enter mobile no. (10 digits): ").strip()
                balance = 0
                
                sql = "INSERT INTO bank_master (acno, name, city, mobileno, balance) VALUES (%s, %s, %s, %s, %s)"
                val = (acno, name, city, mn, balance)
                mycursor.execute(sql, val)
                
                mydb.commit()
                print("Account is successfully created!!!")
            
            # Procedure for depositing money
            elif ch == 2:
                acno = input("Enter account number: ").strip()
                dp = int(input("Enter amount to be deposited: "))
                dot = input("Enter date of Transaction (YYYY-MM-DD): ").strip()
                ttype = "d"
                
                sql = "INSERT INTO banktrans (acno, amount, dot, ttype) VALUES (%s, %s, %s, %s)"
                val = (acno, dp, dot, ttype)
                mycursor.execute(sql, val)
                
                sql_update = "UPDATE bank_master SET balance = balance + %s WHERE acno = %s"
                val_update = (dp, acno)
                mycursor.execute(sql_update, val_update)
                
                mydb.commit()
                print("Money has been deposited successfully!!!")
            
            # Procedure for withdrawing money
            elif ch == 3:
                acno = input("Enter account number: ").strip()
                wd = int(input("Enter amount to be withdrawn: "))
                dot = input("Enter date of transaction (YYYY-MM-DD): ").strip()
                ttype = "w"
                
                # Check balance first
                mycursor.execute("SELECT balance FROM bank_master WHERE acno = %s", (acno,))
                result = mycursor.fetchone()
                if result and result[0] >= wd:
                    sql = "INSERT INTO banktrans (acno, amount, dot, ttype) VALUES (%s, %s, %s, %s)"
                    val = (acno, wd, dot, ttype)
                    mycursor.execute(sql, val)
                    
                    sql_update = "UPDATE bank_master SET balance = balance - %s WHERE acno = %s"
                    val_update = (wd, acno)
                    mycursor.execute(sql_update, val_update)
                    
                    mydb.commit()
                    print("Money has been withdrawn successfully!!!")
                else:
                    print("Insufficient balance!")
            
            # Procedure for displaying account information
            elif ch == 4:
                acno = input("Enter account number: ").strip()
                mycursor.execute("SELECT * FROM bank_master WHERE acno = %s", (acno,))
                for i in mycursor:
                    print(i)
            
            # Exit the loop
            elif ch == 5:
                break
            else:
                print("Invalid choice! Please try again.")
        
        except ValueError:
            print("Please enter a valid number.")
        
except mysql.connector.Error as err:
    print(f"Error: {err}")
finally:
    mydb.close()
