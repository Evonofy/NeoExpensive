# Libs
yarn workspace @neo/postcss build

# Packages
yarn workspace @neo/global build
yarn workspace @neo/icons build
yarn workspace @neo/tokens build
yarn workspace @neo/ui build

# Services
yarn workspace @neo/core build
yarn workspace @neo/mail build
yarn workspace @neo/users build
yarn workspace @neo/api prisma migrate dev
yarn workspace @neo/api prisma generate
yarn workspace @neo/api build