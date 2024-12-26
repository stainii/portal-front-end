package be.stijnhooft.portal.frontend.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class HtmlController {

    /**
     * Routes every request without a suffix to the index page.
     * This way, the HTML5-routing of React is supported.
     *
     * Other rest services will override this route, so it does not get in the way.
     */
    @GetMapping({"", "/", "/**/{[path:[^\\\\.]*}"})
    public String routeToIndex() {
        return "forward:/index.html";
    }

}
