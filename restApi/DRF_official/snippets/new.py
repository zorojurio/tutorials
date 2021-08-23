def add_something():
    print("adding a product")


def login(username, password):
    cont = 1
    while cont:
        if username == "chan" and password == "1234":
            print("welcome")
            add_something()
            cont = 0
        else:
            print("wrong username and password")
            enter = input("u wanna enter again")
            if enter == "yes":
                username = input("enter username")
                password = input("enter password")
            else:
                cont = 0


login("chan", "1234")



