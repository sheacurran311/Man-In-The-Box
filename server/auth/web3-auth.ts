import type { Request, Response, NextFunction } from 'express';
import { config, services } from '../config';

/**
 * Web3 Authentication Middleware
 * Integrates with Dynamic.xyz for wallet-based authentication
 */

export interface AuthenticatedRequest extends Request {
  wallet?: {
    address: string;
    chain: string;
    verified: boolean;
  };
  user?: {
    id: string;
    walletAddress: string;
    role: 'creator' | 'observer' | 'visitor';
  };
}

/**
 * Verify Dynamic.xyz JWT token
 */
export async function verifyDynamicToken(token: string): Promise<{
  walletAddress: string;
  chain: string;
  verified: boolean;
} | null> {
  if (!services.web3.auth) {
    console.warn('Dynamic.xyz not configured - skipping Web3 auth');
    return null;
  }

  try {
    // TODO: Implement actual Dynamic.xyz JWT verification
    // For now, return placeholder
    // const response = await fetch('https://app.dynamic.xyz/api/v0/sdk/verify', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${config.DYNAMIC_API_KEY}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ token }),
    // });

    // const data = await response.json();

    return {
      walletAddress: '0x0000000000000000000000000000000000000000',
      chain: 'ethereum',
      verified: false,
    };
  } catch (error) {
    console.error('Error verifying Dynamic token:', error);
    return null;
  }
}

/**
 * Middleware to require Web3 authentication
 */
export function requireWeb3Auth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  if (!services.web3.auth) {
    // If Web3 is not configured, skip auth in development
    if (config.NODE_ENV === 'development') {
      console.warn('⚠️  Web3 auth skipped - development mode');
      req.wallet = {
        address: '0xDEV_ADDRESS',
        chain: 'ethereum',
        verified: false,
      };
      return next();
    }

    return res.status(503).json({
      error: 'Web3 authentication not configured',
    });
  }

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      error: 'No authentication token provided',
    });
  }

  const token = authHeader.substring(7);

  verifyDynamicToken(token)
    .then(wallet => {
      if (!wallet) {
        return res.status(401).json({
          error: 'Invalid authentication token',
        });
      }

      req.wallet = wallet;
      next();
    })
    .catch(error => {
      console.error('Auth error:', error);
      res.status(500).json({
        error: 'Authentication failed',
      });
    });
}

/**
 * Middleware to check NFT ownership
 */
export async function requireNFTOwnership(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  if (!req.wallet) {
    return res.status(401).json({
      error: 'Wallet not authenticated',
    });
  }

  if (!services.web3.blockchain) {
    // Skip blockchain checks if not configured
    if (config.NODE_ENV === 'development') {
      console.warn('⚠️  NFT ownership check skipped - development mode');
      return next();
    }

    return res.status(503).json({
      error: 'Blockchain integration not configured',
    });
  }

  try {
    const ownsNFT = await checkNFTOwnership(
      req.wallet.address,
      config.NFT_CONTRACT_ADDRESS!
    );

    if (!ownsNFT) {
      return res.status(403).json({
        error: 'You do not own the required NFT',
      });
    }

    next();
  } catch (error) {
    console.error('Error checking NFT ownership:', error);
    res.status(500).json({
      error: 'Failed to verify NFT ownership',
    });
  }
}

/**
 * Check if wallet owns the NFT
 */
async function checkNFTOwnership(
  walletAddress: string,
  contractAddress: string
): Promise<boolean> {
  // TODO: Implement actual blockchain query using viem
  // For now, return placeholder

  // Example implementation:
  // import { createPublicClient, http } from 'viem';
  // import { mainnet } from 'viem/chains';
  //
  // const client = createPublicClient({
  //   chain: mainnet,
  //   transport: http(`https://eth-mainnet.g.alchemy.com/v2/${config.ALCHEMY_API_KEY}`),
  // });
  //
  // const owner = await client.readContract({
  //   address: contractAddress,
  //   abi: ManInTheBoxABI,
  //   functionName: 'ownerOf',
  //   args: [1], // Token ID 1 (only one NFT exists)
  // });
  //
  // return owner.toLowerCase() === walletAddress.toLowerCase();

  return false; // Placeholder
}

/**
 * Get user role based on ownership and access tokens
 */
export async function getUserRole(
  walletAddress: string
): Promise<'creator' | 'observer' | 'visitor'> {
  // Check if wallet owns the NFT
  if (services.web3.blockchain) {
    const ownsNFT = await checkNFTOwnership(
      walletAddress,
      config.NFT_CONTRACT_ADDRESS!
    );

    if (ownsNFT) {
      return 'creator';
    }
  }

  // TODO: Check if wallet has observer token in database

  return 'visitor';
}

/**
 * Middleware to require specific role
 */
export function requireRole(role: 'creator' | 'observer' | 'visitor') {
  return async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.wallet) {
      return res.status(401).json({
        error: 'Not authenticated',
      });
    }

    const userRole = await getUserRole(req.wallet.address);

    // Role hierarchy: creator > observer > visitor
    const roleHierarchy = { creator: 3, observer: 2, visitor: 1 };

    if (roleHierarchy[userRole] < roleHierarchy[role]) {
      return res.status(403).json({
        error: `This action requires ${role} role`,
        currentRole: userRole,
      });
    }

    req.user = {
      id: req.wallet.address,
      walletAddress: req.wallet.address,
      role: userRole,
    };

    next();
  };
}
