package com.edyu.demo.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

@Controller
public class PageController {
    @GetMapping("/")
    //@ResponseBody permet de revoyer un template à la place d'un chemin vers le template
    /*
    public String home(HttpServletRequest request, ModelMap modelMap) {
        //return "<h1>Hello World!</h1>";
        String name = request.getParameter("name") != null && !request.getParameter("name").isEmpty()
                ? request.getParameter("name") //On retourne name si elle existe
                : "World"; // sinon on renvoie World!
        System.out.println(name);
        modelMap.put("name", name); //"name" serra le nom de la variable qu'on injectera dans le template
        return "pages/home";
    }
    */

    //version équivalente plus rapide (avec Spring) :
    public String home(@RequestParam(required = false, defaultValue = "World") String name, ModelMap modelMap) {
        modelMap.put("name", name);
        return "pages/home";
    }
}
