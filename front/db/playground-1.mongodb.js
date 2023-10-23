// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use('RecyclingAppDB');

db.counters.insert({
    _id: "imgUploads",
    sequence_value: 0
});

function getNextSequence(sequenceName) {
    var sequenceDocument = db.counters.findAndModify({
        query: { _id: sequenceName },
        update: { $inc: { sequence_value: 1 } },
        new: true
    });
    return sequenceDocument.sequence_value;
}

// Create a new document in the collection.
db.getCollection('imgUploads').insertOne([
    { 
        id: getNextSequence("imgUploads"),
        name: '플라스틱', 
        description: '일반적으로 물병, 플라스틱 용기 등에 사용되며, 다양한 종류와 분류가 있습니다.', 
        icon: '🍶',
        disposal: '플라스틱 용기나 물병은 깨끗이 헹군 후 병뚜껑, 라벨 제거 후 분리수거함에 넣습니다.'
    },
    { 
        id: getNextSequence("imgUploads"), 
        name: '종이', 
        description: '잡지, 신문, 종이 상자 등 다양한 종류의 종이를 분리수거합니다.', 
        icon: '📄',
        disposal: '잡지, 신문 등의 종이는 깨끗하게 정리하여 묶거나 상자에 담아 분리수거함에 넣습니다. 종이 상자는 펼쳐서 평평하게 만든 후 분리수거합니다. 오염된 종이나 음식물에 젖은 종이는 일반 쓰레기로 배출합니다.'
    },
    { 
        iid: getNextSequence("imgUploads"), 
        name: '유리', 
        description: '무색, 적색, 청색 등의 유리병으로 분류하여 수거합니다.', 
        icon: '🍾',
        disposal: '유리병은 색상별로 분류하여 깨끗이 세척한 후 병뚜껑, 라벨, 씰 등의 이물질을 제거합니다. 유리병 외의 유리 제품(예: 창문 유리, 거울 등)은 일반 쓰레기로 배출합니다. 손상된 유리병은 조심스럽게 포장하여 분리수거함에 넣습니다.'
    },
    { 
        id: getNextSequence("imgUploads"),
        name: '캔', 
        description: '주로 음료수나 맥주 캔 등의 금속 캔을 말합니다.', 
        icon: '🥫',
        disposal: '캔은 내용물을 비운 후 깨끗이 세척하고, 가능한 경우 압착하여 줄인 다음 분리수거함에 넣습니다. 캔의 뚜껑은 위험을 줄이기 위해 캔 안쪽으로 넣거나 별도로 분리수거합니다. 스프레이 캔 등은 가연성이 있으므로 내용물을 완전히 비운 후 배출합니다.'
    },
    { 
        id: getNextSequence("imgUploads"),
        name: '비닐', 
        description: '비닐봉투, 랩 등의 플라스틱 제품을 말합니다.', 
        icon: '🛍️',
        disposal: '비닐 제품은 물로 헹군 후 깨끗이 말립니다. 물기가 남아 있으면 분리수거함에서 쉽게 부패되므로 주의가 필요합니다. 또한, 비닐 제품은 가능한 압착하여 공간을 줄이고 배출합니다. 음식물이나 기타 이물질이 달라붙은 비닐 제품은 일반 쓰레기로 배출해야 합니다.'
    },
    { 
        id: getNextSequence("imgUploads"),
        name: '배터리', 
        description: '사용한 배터리나 충전지를 분리수거합니다.', 
        icon: '🔋',
        disposal: '배터리나 충전지는 환경에 해롭기 때문에 특별히 분리수거해야 합니다. 배터리는 금속 단자 부분을 테이프로 감싸서 단락을 방지하고, 지정된 배터리 수거함에 배출합니다. 충전지는 충전이 불가능하거나 사용하지 않을 경우, 지정된 충전지 수거함에 배출합니다. 또한, 손상된 배터리나 충전지는 화재 위험이 있으므로 특히 주의하여 배출해야 합니다.'
    },
    { 
        id: getNextSequence("imgUploads"),
        name: '전구', 
        description: '소형 및 대형 전구를 분리수거합니다.', 
        icon: '💡',
        disposal: '일반 전구와 절약형 전구(CFL), LED 전구 등 여러 종류의 전구가 있습니다. 일반 전구는 일반 쓰레기로 배출될 수 있지만, 절약형 전구나 LED 전구는 특수 처리가 필요합니다. 이러한 전구에는 수은이나 다른 유해 물질이 포함되어 있을 수 있기 때문입니다. 따라서 지정된 전구 수거함이나 리사이클 센터에 배출하는 것이 좋습니다. 전구를 배출할 때는 깨지지 않도록 주의하며, 깨진 전구는 다치지 않도록 조심스럽게 처리해야 합니다.'
    },
    { 
        id: getNextSequence("imgUploads"),
        name: '전자제품', 
        description: '휴대폰, 컴퓨터, TV 등의 폐 전자제품을 분리수거합니다.', 
        icon: '📱',
        disposal: '폐 전자제품은 유해 물질을 포함하고 있으므로 일반 쓰레기와 함께 배출해서는 안됩니다. 대부분의 지역에서는 전자제품을 분리수거하는 프로그램이 운영되고 있습니다. 전자제품 리사이클 센터 또는 지정된 수거 장소에 해당 제품을 가져가야 합니다. 일부 전자제품 제조사나 판매점에서는 폐 제품을 반환하면 새 제품을 구매할 때 할인을 받을 수 있는 프로그램을 제공하기도 합니다. 또한, 폐 전자제품을 제대로 처리하지 않을 경우 환경에 해를 끼치므로, 지역의 규정과 지침을 잘 따라야 합니다.'
    },
    { 
        id: getNextSequence("imgUploads"),
        name: '의류', 
        description: '사용하지 않는 옷, 신발, 가방 등을 분리수거합니다.', 
        icon: '👚',
        disposal: '사용하지 않는 의류는 기부, 재활용, 분리수거 등의 방법으로 처리될 수 있습니다. 깨끗한 상태의 의류는 기부로 인해 다른 사람들에게 두 번째 생명을 얻을 수 있습니다. 기부함이나 지역 커뮤니티 센터에서 기부받는 경우가 많습니다. 만약 의류가 찢어지거나 지저분한 경우, 의류 재활용함에 버려서 재활용될 수 있습니다. 의류는 특정 재활용 센터에서 섬유 재활용이 가능하며, 이는 청소 랩, 래그, 충전재 등으로 재활용됩니다. 항상 지역의 재활용 지침을 확인하고, 의류를 올바르게 분리수거하세요.'
    },
    { 
        id: getNextSequence("imgUploads"),
        name: '식품 폐기물', 
        description: '음식물 쓰레기 및 기타 식품 폐기물을 분리수거합니다.', 
        icon: '🥕',
        disposal: '음식물 쓰레기는 비료나 바이오 가스로 재활용될 수 있습니다. 음식물 쓰레기는 일반적으로 전용의 음식물 쓰레기 봉투에 담아서 처리하며, 기타 식품 폐기물(비닐 포장재, 캔, 병 등)은 각각의 분리수거 방법에 따라 처리합니다. 음식물 쓰레기는 냄새를 줄이기 위해 잘 말려서 버리는 것이 좋으며, 가능한 경우 주방에서 음식물 쓰레기 처리기를 사용하여 처리할 수도 있습니다. 일부 지역에서는 음식물 쓰레기를 별도로 수거하여 퇴비로 재활용하기도 합니다. 항상 지역의 재활용 지침을 확인하고 식품 폐기물을 올바르게 분리수거하세요.'
    },
]);
