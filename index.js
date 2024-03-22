<!DOCTYPE html>
<html>
<head>
    <title>Infinite Platformer Game</title>
    <style>
        body {
            margin: 0;
            overflow: hidden;
            background-color: #f0f0f0;
        }
        canvas {
            display: block;
        }
    </style>
</head>
<body>
    <canvas id="gameCanvas" width="800" height="600"></canvas>
    <script>
        // Constants
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        const PLATFORM_WIDTH = 80;
        const PLATFORM_HEIGHT = 20;
        const PLAYER_WIDTH = 40;
        const PLAYER_HEIGHT = 60;
        const GRAVITY = 0.5;
        const JUMP_FORCE = -10;
        const PLATFORM_GAP = 200;

        // Variables
        let player = {
            x: canvas.width / 2 - PLAYER_WIDTH / 2,
            y: canvas.height / 2 - PLAYER_HEIGHT / 2,
            vx: 0,
            vy: 0,
            onGround: false
        };
        let platforms = [{
            x: canvas.width / 2 - PLATFORM_WIDTH / 2,
            y: canvas.height - PLATFORM_HEIGHT
        }];

        // Event listener for keyboard input
        document.addEventListener('keydown', function(event) {
            if (event.code === 'Space' && player.onGround) {
                player.vy = JUMP_FORCE;
                player.onGround = false;
            }
        });

        // Game loop
        function gameLoop() {
            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update player
            player.vy += GRAVITY;
            player.y += player.vy;

            // Check for collisions with platforms
            platforms.forEach(platform => {
                if (isColliding(player, platform)) {
                    player.onGround = true;
                    player.vy = 0;
                    player.y = platform.y - PLAYER_HEIGHT;
                }
            });

            // Generate new platforms
            while (platforms[platforms.length - 1].y > 0) {
                let lastPlatform = platforms[platforms.length - 1];
                let newPlatform = {
                    x: Math.random() * (canvas.width - PLATFORM_WIDTH),
                    y: lastPlatform.y - PLATFORM_GAP
                };
                platforms.push(newPlatform);
            }

            // Remove platforms that are out of view
            if (platforms[0].y > canvas.height) {
                platforms.shift();
            }

            // Draw player
            ctx.fillStyle = 'blue';
            ctx.fillRect(player.x, player.y, PLAYER_WIDTH, PLAYER_HEIGHT);

            // Draw platforms
            ctx.fillStyle = 'green';
            platforms.forEach(platform => {
                ctx.fillRect(platform.x, platform.y, PLATFORM_WIDTH, PLATFORM_HEIGHT);
            });

            // Request next frame
            requestAnimationFrame(gameLoop);
        }

        // Function to check collision between two objects
        function isColliding(rect1, rect2) {
            return rect1.x < rect2.x + PLATFORM_WIDTH &&
                   rect1.x + PLAYER_WIDTH > rect2.x &&
                   rect1.y < rect2.y + PLATFORM_HEIGHT &&
                   rect1.y + PLAYER_HEIGHT > rect2.y;
        }

        // Start the game loop
        gameLoop();
    </script>
</body>
</html>
