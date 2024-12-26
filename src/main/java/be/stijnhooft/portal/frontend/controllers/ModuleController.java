package be.stijnhooft.portal.frontend.controllers;

import be.stijnhooft.portal.frontend.dtos.ModuleDto;
import be.stijnhooft.portal.frontend.services.ModuleService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/module")
public class ModuleController {

    private final ModuleService moduleService;

    public ModuleController(ModuleService moduleService) {
        this.moduleService = moduleService;
    }

    @RequestMapping("/")
    public List<ModuleDto> findForLoggedInUser(Principal activeUser) {
        return moduleService.findForUser(activeUser.getName());
    }

}
