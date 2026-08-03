# Use a lightweight Python image
FROM python:3.10-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

# Set the working directory in the container
WORKDIR /app

# Copy only requirements first (improves build efficiency)
COPY requirements.txt /app/

# Install dependencies
RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copy project files after installing dependencies (improves caching)
COPY . /app/

# Collect static files
RUN python manage.py collectstatic --no-input

# Expose port 8000
EXPOSE 8000

# Run the Django application with Gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "fipho_django.wsgi:application"]
