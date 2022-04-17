module.exports = {
    // 지정한 content 파일 문자열
    // 원하는 문자열 패턴을 작성!
    // defaultExtractor: (content) => content.match(/className/g) || [] // 예시
    defaultExtractor: (content) => content.match(/[\w\:\-]+/g) || []
    // 추가적인 class 패턴이 있다면 추가해야함.
}