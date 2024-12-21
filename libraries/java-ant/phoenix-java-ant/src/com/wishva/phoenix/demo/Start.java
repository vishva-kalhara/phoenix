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

        try {

            new Phoenix("uuid.v4()", "c6779278-bdbb-428c-9a46-d84fcc067fe2", "my-stripe-secret").protect();
            
            System.out.println("Has access");
        } catch(PhoenixNoSubscriptionException e){
            
        } catch (PhoenixException | IllegalArgumentException e) {
            e.printStackTrace();
            System.exit(1);
        }
    }
}
