// ====================================
// LOVE PROPOSAL WEBSITE - BACKEND SERVER 💕
// Made with love and passion
// ====================================

const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// Middleware
app.use(express.json());
app.use(express.static(__dirname));

// Data storage file
const proposalsFile = path.join(__dirname, 'proposals.json');

// Initialize proposals file if it doesn't exist
if (!fs.existsSync(proposalsFile)) {
    fs.writeFileSync(proposalsFile, JSON.stringify([], null, 2));
}

/**
 * Get all proposals
 */
app.get('/api/proposals', (req, res) => {
    try {
        const data = fs.readFileSync(proposalsFile, 'utf8');
        const proposals = JSON.parse(data);
        res.json({
            success: true,
            count: proposals.length,
            proposals: proposals
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to read proposals'
        });
    }
});

/**
 * Get proposal statistics
 */
app.get('/api/stats', (req, res) => {
    try {
        const data = fs.readFileSync(proposalsFile, 'utf8');
        const proposals = JSON.parse(data);
        
        res.json({
            success: true,
            totalProposals: proposals.length,
            latestProposal: proposals.length > 0 ? proposals[proposals.length - 1] : null,
            allProposals: proposals
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to read statistics'
        });
    }
});

/**
 * Create new proposal
 */
app.post('/api/proposal', (req, res) => {
    try {
        const { person1, person2, timestamp } = req.body;

        // Validation
        if (!person1 || !person2) {
            return res.status(400).json({
                success: false,
                error: 'Both names are required'
            });
        }

        // Read existing proposals
        const data = fs.readFileSync(proposalsFile, 'utf8');
        const proposals = JSON.parse(data);

        // Create new proposal
        const newProposal = {
            id: proposals.length + 1,
            person1: person1,
            person2: person2,
            timestamp: timestamp || new Date().toISOString(),
            status: 'accepted',
            createdAt: new Date().toISOString()
        };

        // Add to array
        proposals.push(newProposal);

        // Write back to file
        fs.writeFileSync(proposalsFile, JSON.stringify(proposals, null, 2));

        // Return success response
        res.status(201).json({
            success: true,
            proposalId: newProposal.id,
            message: `Congratulations ${person1} & ${person2}! 💕`,
            timestamp: newProposal.timestamp,
            proposal: newProposal
        });

        // Log to console with hearts
        console.log(`\n💕💕💕 NEW PROPOSAL! 💕💕💕`);
        console.log(`${person1} & ${person2} are getting a date! 💖`);
        console.log(`Time: ${new Date(timestamp).toLocaleString()}\n`);

    } catch (error) {
        console.error('Error saving proposal:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to save proposal'
        });
    }
});

/**
 * Get proposal by ID
 */
app.get('/api/proposal/:id', (req, res) => {
    try {
        const data = fs.readFileSync(proposalsFile, 'utf8');
        const proposals = JSON.parse(data);
        const proposal = proposals.find(p => p.id === parseInt(req.params.id));

        if (!proposal) {
            return res.status(404).json({
                success: false,
                error: 'Proposal not found'
            });
        }

        res.json({
            success: true,
            proposal: proposal
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to read proposal'
        });
    }
});

/**
 * Delete all proposals (admin endpoint - use with caution!)
 */
app.delete('/api/proposals', (req, res) => {
    try {
        fs.writeFileSync(proposalsFile, JSON.stringify([], null, 2));
        res.json({
            success: true,
            message: 'All proposals have been deleted'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to delete proposals'
        });
    }
});

/**
 * Home route
 */
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

/**
 * Health check
 */
app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        message: '💕 Love Proposal Server is running! 💕',
        timestamp: new Date().toISOString()
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({
        success: false,
        error: 'Internal server error'
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('\n╔════════════════════════════════════════╗');
    console.log('║  💕 LOVE PROPOSAL SERVER STARTED 💕  ║');
    console.log('╚════════════════════════════════════════╝');
    console.log(`\n✨ Server running at: http://localhost:${PORT}`);
    console.log('✨ API Health: http://localhost:' + PORT + '/api/health');
    console.log('✨ View proposals: http://localhost:' + PORT + '/api/proposals');
    console.log('✨ View stats: http://localhost:' + PORT + '/api/stats\n');
});
