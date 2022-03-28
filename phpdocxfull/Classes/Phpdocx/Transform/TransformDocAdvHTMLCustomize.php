<?php

namespace Phpdocx\Transform;

require_once 'TransformDocAdvHTML.php';

class TransformDocAdvHTMLCustomize extends TransformDocAdvHTML
{
    public function isOMath(): bool
    {
        $content = $this->docxStructure->getContent('word/document.xml');
        $xmlContent = new \DOMDocument();
        $xmlContent->loadXML($content);

        return $this->checkOMathInContent($xmlContent);
    }

    function checkOMathInContent($xmlContent): bool
    {
        foreach ($xmlContent->childNodes as $childNode) {
            if ($childNode->nodeName == 'm:oMath') {
                return true;
            }

            if ($childNode->hasChildNodes()) {
                if ($this->checkOMathInContent($childNode)) {
                    return true;
                }
            }
        }

        return false;
    }

}
