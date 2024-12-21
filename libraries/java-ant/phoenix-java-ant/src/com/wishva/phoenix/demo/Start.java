/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.wishva.phoenix.demo;

import com.wishva.phoenix.Phoenix;
import com.wishva.phoenix.utils.PhoenixException;

/**
 *
 * @author vishv
 */
public class Start {

    public static void main(String[] args) {

        try {

            new Phoenix().protect();
            
            System.out.println("Has access");
        } catch (PhoenixException e) {
            e.printStackTrace();
        }
    }
}
