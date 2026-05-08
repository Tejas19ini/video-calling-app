//processing data and implementing the core functionality of the system.”
package com.teju.videocall.user;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.IntStream;//works with integers generate,search,filter and to perform operations

import org.springframework.stereotype.Service;

//it will contain the business logic related to user management, such as creating, updating, deleting users, and handling user authentication and authorization.
@Service
public class Userservice {

    private static final List<User> USERS_LIST = new ArrayList<>();//a static list to store user objects in memory***stores users

    public void register(User user) {
        //logic to register a new user, such as validating input and adding the user to the list
        user.setStatus("online");//setting the status of the user to "online" when they register
        USERS_LIST.add(user);//adding the user to the USERS_LIST
    }

    public User login(User user){//searches user through email
        var userIndex = IntStream.range(0,USERS_LIST.size())
                .filter(i -> USERS_LIST.get(i).getEmail().equals(user.getEmail()) )
                .findAny()
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));
        var cUser = USERS_LIST.get(userIndex);//retrieving the user from the USERS_LIST using the found index

        cUser.setStatus("online");
        return cUser;
    }

    public void logout(String email){
         var userIndex = IntStream.range(0,USERS_LIST.size())
                .filter(i -> USERS_LIST.get(i).getEmail().equals(email))
                .findAny()
                .orElseThrow(() -> new RuntimeException("User not found"));
        USERS_LIST.get(userIndex).setStatus("Offline");
    }

    public List<User> findAll(){
        return USERS_LIST;
    }
}
