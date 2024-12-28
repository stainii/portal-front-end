package be.stijnhooft.portal.frontend.exceptions;

public class ModuleCollectionNotFoundException extends RuntimeException {
    public ModuleCollectionNotFoundException(String user) {
        super("No module collection for user %s found".formatted(user));
    }
}
