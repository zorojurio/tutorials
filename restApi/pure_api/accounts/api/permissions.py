from rest_framework import permissions


class BlocklistPermission(permissions.BasePermission):
    """
    Global permission check for blocked IPs.
    """

    def has_permission(self, request, view):
        # ip_addr = request.META['REMOTE_ADDR']
        # blocked = Blocklist.objects.filter(ip_addr=ip_addr).exists() # true or false
        # return not blocked
        pass


class AnonPermissionOnly(permissions.BasePermission):
    """
    Non Authenticated users only
    """
    message = 'You are already Authenticated, Please log out to try again'

    def has_permission(self, request, view):
        return not request.user.is_authenticated()


class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Object-level permission to only allow owners of an object to edit it.
    Assumes the model instance has an `owner` attribute.
    """
    message = "You must be the owner in order to edit"

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        # Instance must have an attribute named `owner`.
        return obj.owner == request.user
