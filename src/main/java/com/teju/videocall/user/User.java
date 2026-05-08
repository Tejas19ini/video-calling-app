//It represents a User entity,It stores all user-details
package com.teju.videocall.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data//automatically gets data
@NoArgsConstructor//creates constructor to create objects with no arguments
@AllArgsConstructor//creates constructor to create objects with arguments
@Builder//object  creation
public class User {//usser in the class

    private String username;
    private String email;   // ✅ IMPORTANT (was missing)
    private String password;
    private String status;
}