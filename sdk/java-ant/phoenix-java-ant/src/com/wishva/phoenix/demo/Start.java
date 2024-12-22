/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.wishva.phoenix.demo;

import com.wishva.phoenix.Phoenix;
import com.wishva.phoenix.utils.PhoenixException;
import com.wishva.phoenix.utils.PhoenixNoSubscriptionException;

/**
 *
 * @author vishv
 */
public class Start {

    public static void main(String[] args) {

//        try {
//
//            new Phoenix("uuid.v4()", "c6779278-bdbb-428c-9a46-d84fcc067fe2", "sk_test_51QYAE7RpWclcqhjc3CKUY2zAi11tzgWMJTXE5F6hu7EASAlnhGU3bmAaEYXRpD65Lkv36VdZLWBeTrBC3Ousb68j00IqoZ9pUB").protect();
//            
//            System.out.println("Has access");
//        } catch(PhoenixNoSubscriptionException e){
//            
//        } catch (PhoenixException | IllegalArgumentException e) {
//            e.printStackTrace();
//            System.exit(1);
//        }
        String os = System.getProperty("os.name");
        String version = System.getProperty("os.version");
        String arch = System.getProperty("os.arch");
        String user = System.getProperty("user.name");

        String uniqueId = os + "-" + version + "-" + arch + "-" + user;
        System.out.println(uniqueId);
    }
}
