import logging
from ipware import get_client_ip

logger = logging.getLogger('custom')

class RequestLoggingMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Get client IP and user agent
        client_ip, _ = get_client_ip(request)
        user_agent = request.META.get('HTTP_USER_AGENT', '-')
        request.client_ip = client_ip or 'unknown'
        request.user_agent = user_agent

        # Get the HTTP method, path, and protocol
        method = request.method
        path = request.path
        protocol = request.META.get('SERVER_PROTOCOL', 'HTTP/1.0')

        # Process the request and get the response
        response = self.get_response(request)

        # Capture the content length or mark as 'streaming' for file responses without loading content
        content = getattr(response, 'content', None)
        if content is not None:
            content_length = len(content)
        else:
            content_length = response.get('Content-Length', 'streaming')

        # Log the request without the timestamp since logging system adds it
        logger.info(
            f'{method} {path} {protocol} {response.status_code} {content_length} {request.client_ip} "{request.user_agent}"'
        )
        return response
