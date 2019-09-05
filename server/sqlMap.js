// sql语句
var sqlMap = {
    // 用户
    user: {
        getTool: 'SELECT * FROM tool WHERE id=? AND status="Approved";',
        getRatingBrief: 'SELECT AVG(rating) AS rating, COUNT(*) AS count FROM feedback WHERE tool_id=?',
        getAdvancedInfo: 'SELECT tag.tag_name, tag.tag_type, tag.tag_id FROM tnt,tag WHERE tnt.tool_id=? AND tag.tag_id=tnt.tag_id',
        getReview: 'SELECT review.learning, review.visual_quality, review.speed, review.scalability, review.customisability, review.usability, review.text, user.username from review, user WHERE review.tool_id=? AND review.user_id=user.id AND review.status="Approved"',
        getRating: 'SELECT feedback.rating, feedback.text, user.username from feedback, user WHERE feedback.tool_id=? AND feedback.user_id=user.id AND feedback.status="Approved"',
        getAllTag: 'SELECT tag_name, tag_type, tag_id, icon FROM tag ORDER BY tag_name',
        postTool: 'INSERT INTO tool(name, author, link, image1, status) VALUES (?, ?, ?, ?, "Pending")',
        postTnT: 'INSERT INTO tnt(tool_id, tag_id) VALUES (?, ?)',
        postFeedback: 'INSERT INTO feedback(rating, tool_id, user_id, text, status) VALUES (?, ?, ?, ?, "Pending")',
        postReview: 'INSERT INTO review(learning, visual_quality, speed, scalability, customisability, usability, tool_id, user_id, text, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, "Pending")',
        postUser: 'INSERT INTO user(username, password) VALUES (?, ?)',
        checkPassword: 'SELECT username, id FROM user WHERE username=? AND password=?',
        addTool: 'INSERT INTO tool(name, author, link, image1, status) VALUES (?, ?, ?, ?, "Pending"); SELECT LAST_INSERT_ID();',
        addToolTag: 'INSERT INTO tnt(tool_id, tag_id) VALUES (?, ?)',
        getToolBrief: 'SELECT name, author, id, image1 FROM tool WHERE status="Approved"',
        checkDuplicate: 'SELECT COUNT(*) AS count FROM tool WHERE name=?',
        checkFeedback: 'SELECT COUNT(*) AS count FROM feedback WHERE user_id=? AND tool_id=?',
        checkReview: 'SELECT COUNT(*) AS count FROM review WHERE user_id=? AND tool_id=?',
        getToolName: 'SELECT name FROM tool WHERE id=?',
        postFeedback: 'INSERT INTO feedback(rating, tool_id, user_id, text, status) VALUES (?, ?, ?, ?, "Approved")'
    }
}
 
module.exports = sqlMap;