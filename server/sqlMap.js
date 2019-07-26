// sql语句
var sqlMap = {
    // 用户
    user: {
        add: 'insert INTO user(name, age) VALUES (?, ?)', 
        deleteS: 'delete FROM user WHERE name=?',
        search: 'SELECT * FROM user',
        takimg: 'SELECT * FROM testimg2 WHERE id=7',
        addimg: 'insert INTO testimg2(img) VALUES (?)',
        getTool: 'SELECT * FROM tool WHERE id=?',
        getRatingBrief: 'SELECT AVG(rating) AS rating, COUNT(*) AS count FROM feedback WHERE tool_id=?',
        getAdvancedInfo: 'SELECT tag.tag_name, tag.tag_type FROM tnt,tag WHERE tnt.tool_id=? AND tag.tag_id=tnt.tag_id ORDER BY tag.tag_type',
        getRating: 'SELECT * from feedback WHERE tool_id=?',
        getReview: 'SELECT * from review WHERE tool_id=?',
        getAllTag: 'SELECT tag_name, tag_type from tag',
        postTool: 'INSERT INTO tool(name, author, link, image1, status) VALUES (?, ?, ?, ?, "Pending")',
        postTnT: 'INSERT INTO tnt(tool_id, tag_id) VALUES (?, ?)',
        postFeedback: 'INSERT INTO feedback(rating, tool_id, user_id, text, status) VALUES (?, ?, ?, ?, "Pending")',
        postReview: 'INSERT INTO review(learning, visual_quality, speed, scalability, customisability, usability, tool_id, user_id, text, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, "Pending")'
    }
}
 
module.exports = sqlMap;